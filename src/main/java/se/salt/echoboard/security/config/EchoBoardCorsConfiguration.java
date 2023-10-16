package se.salt.echoboard.security.config;

import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

public class EchoBoardCorsConfiguration {

    public static Customizer<CorsConfigurer<HttpSecurity>> withEchoBoardDefaults(String baseUrl) {
        return cors -> cors
                .configurationSource(corsConfigurationSource(baseUrl));
    }


    private static CorsConfigurationSource corsConfigurationSource(String baseUrl) {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin(baseUrl);
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
