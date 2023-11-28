package se.salt.echoboard.multitenancy.data.hibernate;


import org.hibernate.cfg.AvailableSettings;
import org.hibernate.context.spi.CurrentTenantIdentifierResolver;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import se.salt.echoboard.multitenancy.context.TenantContext;

import java.util.HashMap;
import java.util.Map;

import static se.salt.echoboard.multitenancy.context.TenantContext.DEFAULT_TENANT_ID;


@Component
public class TenantIdentifierResolver implements CurrentTenantIdentifierResolver
        , HibernatePropertiesCustomizer {

    private final Map<String, String> tenantMap;

    //TODO: The map should be replaced by a database
    public TenantIdentifierResolver() {
        tenantMap = new HashMap<>();
        tenantMap.put("gmail.com", "google");
        tenantMap.put("example.com", "google");
        tenantMap.put("appliedtechnology.com", "salt");
    }


    @Override @NonNull
    public String resolveCurrentTenantIdentifier() {
        String tenantId = TenantContext.getTenantId();
        return tenantMap.getOrDefault(tenantId, DEFAULT_TENANT_ID);
    }

    @Override
    public boolean validateExistingCurrentSessions() {
        return false;
    }

    @Override
    public void customize(Map<String, Object> hibernateProperties) {
        hibernateProperties.put(AvailableSettings.MULTI_TENANT_IDENTIFIER_RESOLVER, this);
    }
}
