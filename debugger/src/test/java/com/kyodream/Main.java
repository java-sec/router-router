package com.kyodream;


import com.kyodream.debugger.DebuggerApplication;
import com.sun.jdi.Method;
import com.sun.jdi.ReferenceType;
import com.sun.jdi.VirtualMachine;

import java.io.File;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        String path = DebuggerApplication.class.getClass().getResource("/lib/jdk8.jar").getPath();
        System.out.println(path);
    }
}