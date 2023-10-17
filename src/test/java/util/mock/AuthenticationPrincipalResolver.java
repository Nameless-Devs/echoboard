package util.mock;


import lombok.NonNull;
import org.springframework.core.MethodParameter;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;


public class AuthenticationPrincipalResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.getParameterType().isAssignableFrom(DefaultOidcUser.class);
    }

    @Override
    public DefaultOidcUser resolveArgument(@NonNull MethodParameter parameter,
                                           ModelAndViewContainer mavContainer,
                                           @NonNull NativeWebRequest webRequest,
                                           WebDataBinderFactory binderFactory) {

        return (DefaultOidcUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

}
