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

import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.HEAD;
import static se.salt.echoboard.security.config.EchoBoardCorsConfiguration.withEchoBoardDefaults;
import static se.salt.echoboard.security.config.JwtValidation.JWT_TOKEN_COOKIE_NAME;

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
                                .requestMatchers(GET, "api/v1/echoes","api/v1/echoes/*").permitAll()
                                .requestMatchers(HEAD, "api/v1/status").permitAll()
                                .requestMatchers("login","chat","w","error").permitAll()
                                .anyRequest().authenticated()
                )
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .cors(withEchoBoardDefaults(websiteProperties.frontend()))
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(customAuthenticationSuccessHandler))
                .addFilterBefore(tenantFilter, OAuth2AuthorizationRequestRedirectFilter.class)
                .addFilterBefore(jwtCookieAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(logout -> logout.logoutSuccessHandler(customLogoutSuccessHandler)
                        .deleteCookies(JWT_TOKEN_COOKIE_NAME))
                .csrf(CsrfConfigurer::disable)
                .build();
    }

}
