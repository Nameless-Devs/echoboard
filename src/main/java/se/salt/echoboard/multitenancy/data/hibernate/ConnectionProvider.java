package se.salt.echoboard.multitenancy.data.hibernate;

import lombok.extern.slf4j.Slf4j;
import org.hibernate.cfg.AvailableSettings;
import org.hibernate.engine.jdbc.connections.spi.MultiTenantConnectionProvider;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Map;

import static se.salt.echoboard.multitenancy.context.TenantContext.DEFAULT_TENANT_ID;


@Component
@Slf4j
public class ConnectionProvider implements MultiTenantConnectionProvider, HibernatePropertiesCustomizer {

    private final DataSource dataSource;

    public ConnectionProvider(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public Connection getAnyConnection() throws SQLException {
        return getConnection(DEFAULT_TENANT_ID);
    }

    @Override
    public void releaseAnyConnection(Connection connection) throws SQLException {
        connection.close();
    }

    @Override
    public Connection getConnection(String tenantIdentifier) throws SQLException {
        var connection = dataSource.getConnection();
        connection.setSchema(tenantIdentifier);
        log.info("DataSource Connection schema set to : {}" , connection.getSchema());
        log.info("DataSource Connection created: {}" , connection.getMetaData().getURL());
        return connection;
    }

    @Override
    public void releaseConnection(String s, Connection connection) throws SQLException {
        connection.setSchema(DEFAULT_TENANT_ID);
        connection.close();
    }

    @Override
    public boolean supportsAggressiveRelease() {
        return false;
    }

    @Override
    public boolean isUnwrappableAs(Class<?> aClass) {
        return false;
    }

    @Override
    public <T> T unwrap(Class<T> aClass) {
        return null;
    }

    @Override
    public void customize(Map<String, Object> hibernateProperties) {
        hibernateProperties.put(AvailableSettings.MULTI_TENANT_CONNECTION_PROVIDER, this);
    }
}
