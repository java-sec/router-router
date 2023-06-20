package com.kyodream.debugger.core.category;

import com.kyodream.debugger.core.analyse.Utils;
import com.kyodream.debugger.core.category.format.JettyFormat;
import com.kyodream.debugger.service.DebugWebSocket;
import com.sun.jdi.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;


/**
 * jetty支持
 * jersey
 * struts
 */
@Component
@Slf4j
public class Jetty extends AbstractDataWrapper {
    private static Set<String> discoveryClass = new HashSet<>();
    private static Set<String> blackList = new HashSet<String>();

    static {
        discoveryClass.add("org.eclipse.jetty.webapp.WebAppContext");
        discoveryClass.add("org.eclipse.jetty.servlet.ServletContextHandler");
        blackList.add("org.eclipse.jetty.servlet.NoJspServlet");
    }

    @Autowired
    private Jersey jerseyHandle;

    private HashMap<String, String> maps = new HashMap<>();
    private String version;
    private Set<ObjectReference> jettyObjects = new HashSet<>();

    @Autowired
    private DebugWebSocket debugWebSocket;

    @Autowired
    private Struts struts;

    private VirtualMachine vm;

    @Override
    public void addAnalysisObject(Set<ObjectReference> objectReference) {
        debugWebSocket.sendInfo("发现jetty对象");
        this.jettyObjects.addAll(objectReference);
    }

    @Override
    public void analystsObject(VirtualMachine attach) {
        vm = attach;
        handleVersion(attach);
        hasFind();
        debugWebSocket.sendInfo("开始分析jetty");
        for (ObjectReference jettyObject : jettyObjects) {
            selectorHandle(jettyObject);
        }
        debugWebSocket.sendInfo("结束分析jetty");
    }

    private void selectorHandle(ObjectReference jettyObject) {
        String handleName = jettyObject.referenceType().name();
        if (handleName != null) {
            if (handleName.contains("ServletContextHandler")) {
                debugWebSocket.sendSuccess("发现ServletContextHandler");
                handlerServletContext(jettyObject, "");
            } else if (handleName.contains("WebAppContext")) {
                debugWebSocket.sendSuccess("发现WebAppContext");
                handleWebAppContext(jettyObject, "");
            }
        }
    }

    private void handleWebAppContext(ObjectReference handler, String prefix) {
        String rawContextPath = Utils.getFieldObject(handler, "_contextPath").toString();
        String contextPath = JettyFormat.doubleDot(rawContextPath);
        ObjectReference servletHandler = Utils.getFieldObject(handler, "_servletHandler");
        ArrayReference servletMappings = (ArrayReference) Utils.getFieldObject(servletHandler, "_servletMappings");
        HashMap<String, String> servletAliasName = getServletAliasName(servletHandler);
        handlerServletMappingObject(servletMappings, prefix + contextPath, servletAliasName, servletHandler);
    }

    private void handlerServletContext(ObjectReference handler, String prefix) {
        ObjectReference servletHandler = Utils.getFieldObject(handler, "_servletHandler");
        ArrayReference servletMappings = (ArrayReference) Utils.getFieldObject(servletHandler, "_servletMappings");
        HashMap<String, String> servletAliasName = getServletAliasName(servletHandler);
        handlerServletMappingObject(servletMappings, prefix, servletAliasName, servletHandler);
    }

    private HashMap<String, String> getServletAliasName(ObjectReference servletHandler) {
        HashMap<String, String> result = new HashMap<>();
        ArrayReference servlets = (ArrayReference) Utils.getFieldObject(servletHandler, "_servlets");
        for (Value servlet : servlets.getValues()) {
            ObjectReference servletObject = (ObjectReference) servlet;
            StringReference name = (StringReference) Utils.getFieldObject(servletObject, "_name");
            StringReference className = (StringReference) Utils.getFieldObject(servletObject, "_className");
            result.put(name.value(), className.value());
        }
        return result;
    }

    private void handlerServletMappingObject(ArrayReference servletMappings, String prefix, HashMap<String, String> classNameMapping, ObjectReference servletHandler) {

        for (Value servletMapping : servletMappings.getValues()) {
            String classNameMap = ((StringReference) Utils.getFieldObject((ObjectReference) servletMapping, "_servletName")).value();
            String className = classNameMapping.get(classNameMap);
            ArrayReference pathSpecs = (ArrayReference) Utils.getFieldObject((ObjectReference) servletMapping, "_pathSpecs");
            for (Value pathSpec : pathSpecs.getValues()) {
                String rawResult = ((StringReference) pathSpec).value();
                String url = JettyFormat.doubleSlash(prefix + rawResult);
                if (jerseyHandle.getDiscoveryClass().contains(className)) {
                    if (rawResult.endsWith("*")) {
                        jerseyHandle.registryPrefix(url.substring(0, url.length() - 1));
                        jerseyHandle.analystsObject(vm);
                    }
                }
                if (className.equals("org.apache.struts.action.ActionServlet")) {
                    if (!url.startsWith("/")) {
                        struts.registryPrefix(prefix + "*." + url);
                    } else {
                        struts.registryPrefix(prefix + url + "/*");
                    }
                    struts.registryPrefix(url);
                    struts.analystsObject(vm);
                }
                if (!blackList.contains(className)) {
                    maps.put(url, className);
                }
            }
        }

        if (struts.getStrutsVersion() == 2) {
            ArrayReference filterMappings = (ArrayReference) Utils.getFieldObject(servletHandler, "_filterMappings");
            filterMappings.getValues().stream().forEach((Value filterMapping) -> {
                ObjectReference filterMappingRef = (ObjectReference) filterMapping;
                ObjectReference holderRef = Utils.getFieldObject(filterMappingRef, "_holder");
                StringReference classNameRef = (StringReference) Utils.getFieldObject(holderRef, "_className");
                String url = null;
                if (classNameRef.value().equals("org.apache.struts2.dispatcher.filter.StrutsPrepareAndExecuteFilter") ||
                        classNameRef.value().equals("org.apache.struts2.dispatcher.ng.filter.StrutsPrepareAndExecuteFilter")) {
                    ArrayReference pathSpecsArray = (ArrayReference) Utils.getFieldObject(filterMappingRef, "_pathSpecs");
                    StringReference urlRef = (StringReference) pathSpecsArray.getValue(0);
                    url = urlRef.value();
                }
                if (url != null) {
                    struts.registryPrefix(url);
                    struts.analystsObject(vm);
                }
            });
        }
    }

    @Override
    public HashMap<String, String> getDataWrapper() {
        return maps;
    }

    @Override
    public String getVersion() {
        return version;
    }

    @Override
    public void clearData() {
        clearFindFlag();
        maps = new HashMap<>();
        this.jettyObjects = new HashSet<>();
        version = "";
    }

    @Override
    public Set<String> getDiscoveryClass() {
        return discoveryClass;
    }

    private void handleVersion(VirtualMachine attach) {
        List<ReferenceType> referenceTypes = attach.classesByName("org.eclipse.jetty.util.Jetty");
        for (ReferenceType referenceType : referenceTypes) {
            Field version = referenceType.fieldByName("VERSION");
            StringReference jettyVersion = (StringReference) referenceType.getValue(version);
            this.version = jettyVersion.value();
        }
    }

}