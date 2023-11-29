package se.salt.echoboard.multitenancy.tenant;


import org.springframework.lang.NonNull;

@FunctionalInterface
public interface TenantResolver<T> {

    String resolveTenantId(@NonNull T object);
}
