package se.salt.echoboard.multitenancy.data.hibernate;


import org.hibernate.context.spi.CurrentTenantIdentifierResolver;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import se.salt.echoboard.multitenancy.context.TenantContext;

import static se.salt.echoboard.multitenancy.context.TenantContext.DEFAULT_TENANT_ID;


@Component
public class TenantIdentifierResolver implements CurrentTenantIdentifierResolver
//        , HibernatePropertiesCustomizer
{

    @Override @NonNull
    public String resolveCurrentTenantIdentifier() {
        String tenantId = TenantContext.getTenantId();
        if (tenantId != null) {
            return tenantId;
        }
        return DEFAULT_TENANT_ID;
    }

    @Override
    public boolean validateExistingCurrentSessions() {
        return false;
    }

//    @Override
//    public void customize(Map<String, Object> hibernateProperties) {
//        hibernateProperties.put(AvailableSettings.MULTI_TENANT_IDENTIFIER_RESOLVER, this);
//    }
}
