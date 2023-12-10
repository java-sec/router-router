package kyodream.annotation;

import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target(value={ElementType.TYPE})
@Documented
@Inherited
public @interface ClassName {
    public String value();
}