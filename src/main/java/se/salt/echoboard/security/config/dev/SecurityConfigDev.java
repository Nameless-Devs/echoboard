package se.salt.echoboard.security.config.dev;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static se.salt.echoboard.security.config.EchoBoardCorsConfiguration.withEchoBoardDefaults;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@Profile({"dev", "test"})
public class SecurityConfigDev {

    private final MockUserAuthenticationFilter mockUserAuthenticationFilter;
    @Value("${frontend-details.base-url}")
    private String baseUrl;

    @Bean
    DefaultSecurityFilterChain defaultChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("api/status").permitAll()
                        .requestMatchers("error").permitAll()
                        .anyRequest().authenticated())
                .csrf(CsrfConfigurer::disable)
                .cors(withEchoBoardDefaults(baseUrl))
                .addFilterBefore(mockUserAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}
