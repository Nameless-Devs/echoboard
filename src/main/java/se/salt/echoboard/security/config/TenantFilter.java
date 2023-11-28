package se.salt.echoboard.security.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import se.salt.echoboard.multitenancy.context.TenantContext;
import se.salt.echoboard.multitenancy.tenant.HttpJwtTenantResolver;

import java.io.IOException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class TenantFilter extends OncePerRequestFilter {

    private final HttpJwtTenantResolver httpJwtTenantResolver;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        Optional.ofNullable(httpJwtTenantResolver.resolveTenantId(request))
                .ifPresent(TenantContext::setTenantId);
        filterChain.doFilter(request, response);
        clear();
    }


    private void clear() {
        TenantContext.clear();
    }

}
