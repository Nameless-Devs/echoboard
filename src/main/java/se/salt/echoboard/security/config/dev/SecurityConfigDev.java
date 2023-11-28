package se.salt.echoboard.security.config.dev;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import se.salt.echoboard.security.config.CustomLogoutSuccessHandler;

import static se.salt.echoboard.security.config.EchoBoardCorsConfiguration.withEchoBoardDefaults;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@Profile({"dev", "test"})
public class SecurityConfigDev {

    private final MockUserAuthenticationFilter mockUserAuthenticationFilter;
    private final CustomLogoutSuccessHandler customLogoutSuccessHandler;
    @Value("${frontend-details.base-url}")
    private String baseUrl;

    @Bean
    DefaultSecurityFilterChain defaultChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("api/v1/status").permitAll()
                        .requestMatchers("login").permitAll()
                        .requestMatchers("error").permitAll()
                        .anyRequest().authenticated())
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .csrf(CsrfConfigurer::disable)
                .cors(withEchoBoardDefaults(baseUrl))
                .addFilterBefore(mockUserAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(logout -> logout.logoutSuccessHandler(customLogoutSuccessHandler))
                .build();
    }
}
