package se.salt.echoboard.multitenancy.context;


import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public final class TenantContext {

    public static final String DEFAULT_TENANT_ID = "public";

    private static final ThreadLocal<String> tenantId = new InheritableThreadLocal<>();

    public static void setTenantId(String tenant) {
        log.info("Setting current tenant to {}", tenant);
        tenantId.set(tenant);
    }

    public static String getTenantId() {
        return tenantId.get();
    }

    public static void clear() {
        tenantId.remove();
    }

}
