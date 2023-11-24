package se.salt.echoboard.tenant;

import com.nimbusds.jwt.JWTParser;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationManagerResolver;

import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

import static se.salt.echoboard.security.config.JwtValidation.getJwtTokenFromRequestCookie;

public class TenantAuthenticationManagerResolver implements AuthenticationManagerResolver<HttpServletRequest> {

    private final Map<String, String> tenants = new HashMap<>();
    @Override
    public AuthenticationManager resolve(HttpServletRequest context) {
        return null;
    }

    private String toTenant(HttpServletRequest request){
        String token = getJwtTokenFromRequestCookie(request).orElseThrow();
        try {
           var email = (String) JWTParser.parse(token).getJWTClaimsSet().getClaim("email");
            return email.split("@")[1].split("\\.")[0];
        } catch (ParseException e) {
            throw new IllegalArgumentException(e);
        }
    }

//    private AuthenticationManager fromTenant(String tenant){
//        return Optional.ofNullable(this.tenants.get(tenant))
//                .map(JwtDecoders::fromIssuerLocation)
//                .map(JwtAuthenticationProvider::new)
//                .orElseThrow(() -> new IllegalArgumentException("unknown tenant"))::authenticate;
//    }
}
