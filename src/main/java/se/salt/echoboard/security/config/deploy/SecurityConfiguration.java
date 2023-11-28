package se.salt.echoboard.security.config.deploy;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestRedirectFilter;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import se.salt.echoboard.security.config.CustomLogoutSuccessHandler;
import se.salt.echoboard.security.config.TenantFilter;
import se.salt.echoboard.security.config.WebsiteProperties;

import static se.salt.echoboard.security.config.EchoBoardCorsConfiguration.withEchoBoardDefaults;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@Profile("deploy")
public class SecurityConfiguration {

    private final CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler;
    private final CustomLogoutSuccessHandler customLogoutSuccessHandler;
    private final JwtCookieAuthenticationFilter jwtCookieAuthenticationFilter;
    private final TenantFilter tenantFilter;
    private final WebsiteProperties websiteProperties;

    @Bean
    DefaultSecurityFilterChain defaultChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(auth ->
                        auth
                                .requestMatchers("api/v1/status").permitAll()
                                .requestMatchers("login").permitAll()
                                .requestMatchers("chat").permitAll()
                                .requestMatchers("w").permitAll()
                                .requestMatchers("error").permitAll()
                                .anyRequest().authenticated()
                )

                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .cors(withEchoBoardDefaults(websiteProperties.frontend()))
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(customAuthenticationSuccessHandler))
                .addFilterBefore(tenantFilter, OAuth2AuthorizationRequestRedirectFilter.class)
                .addFilterBefore(jwtCookieAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(logout -> logout.logoutSuccessHandler(customLogoutSuccessHandler)
                        .deleteCookies("JwtToken"))
                .csrf(CsrfConfigurer::disable)
                .build();
    }

}
