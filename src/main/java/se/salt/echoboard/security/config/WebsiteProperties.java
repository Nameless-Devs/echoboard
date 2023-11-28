package se.salt.echoboard.security.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "website.base-url")
public record WebsiteProperties(

        String backend,
        String frontend
) { }
