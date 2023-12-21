package se.salt.echoboard.multitenancy.tenant;


import com.nimbusds.jwt.JWTParser;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

import java.text.ParseException;

import static se.salt.echoboard.security.config.JwtValidation.getJwtTokenFromRequestCookie;

@Component
@Slf4j
public class HttpJwtTenantResolver implements TenantResolver<HttpServletRequest>{

    @Override
    public String resolveTenantId(@NonNull HttpServletRequest request) {

        var token = getJwtTokenFromRequestCookie(request);

        if (token.isPresent()) {
            try {
                var jwt = JWTParser.parse(token.get()).getJWTClaimsSet();
                return getTenantIdFromEmail(String.valueOf(jwt.getClaim("email")));
            } catch (ParseException e) {
                log.error("Parsing error occurred: {}", e.getMessage());
            }
        }
        return DEFAULT_TENANT_ID;

    }

    /*
    * The tenant id is the domain of the email
    * */
    private String getTenantIdFromEmail(String email) {
        return email.split("@")[1];
    }

}
