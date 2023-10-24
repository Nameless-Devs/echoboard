package se.salt.echoboard.security.config.deploy;

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
@Profile("deploy")
public class SecurityConfiguration {

    private final CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler;
    private final JwtCookieAuthenticationFilter jwtCookieAuthenticationFilter;
    @Value("${frontend-details.base-url}")
    private String baseUrl;

    @Bean
    DefaultSecurityFilterChain defaultChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(auth ->
                        auth
                                .requestMatchers("api/status").permitAll()
                                .requestMatchers("login").permitAll()
                                .requestMatchers("error").permitAll()
                                .anyRequest().authenticated()
                )
                .cors(withEchoBoardDefaults(baseUrl))
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(customAuthenticationSuccessHandler))
                .addFilterBefore(jwtCookieAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .csrf(CsrfConfigurer::disable)
                .build();
    }

}
