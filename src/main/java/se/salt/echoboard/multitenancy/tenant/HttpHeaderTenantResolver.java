package se.salt.echoboard.multitenancy.tenant;

import jakarta.servlet.http.HttpServletRequest;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import se.salt.echoboard.multitenancy.TenantHttpProperties;

@Component
@RequiredArgsConstructor
public class HttpHeaderTenantResolver implements TenantResolver<HttpServletRequest>{


    private final TenantHttpProperties tenantHttpProperties;

    @Override
    public String resolveTenantId(@NonNull HttpServletRequest request) {
        return request.getHeader(tenantHttpProperties.headerName());
    }
}
