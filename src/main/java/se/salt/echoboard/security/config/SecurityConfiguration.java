package se.salt.echoboard.security.config;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.web.cors.CorsConfiguration;
import se.salt.echoboard.security.CustomAuthenticationSuccessHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
@Profile("deploy")
public class SecurityConfiguration {

    private final CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler;

    @Bean
    DefaultSecurityFilterChain defaultChain(HttpSecurity http) throws Exception {
        return http.authorizeHttpRequests(auth ->
                        auth
                                .requestMatchers("/api/status").permitAll()
                                .anyRequest().authenticated()
                )
//                .cors().disable
//                .csrf().disable
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(customAuthenticationSuccessHandler)
                        )
                .cors(corsCustomizer())
                .csrf(AbstractHttpConfigurer::disable)
                .build();
    }

    @Bean
    public Customizer<CorsConfigurer<HttpSecurity>> corsCustomizer() {
        return cors -> cors
                .configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(List.of("https://echoboard.vercel.app/"));
                    config.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH"));
                    config.setAllowCredentials(true);
                    return config;
                });
    }
}
