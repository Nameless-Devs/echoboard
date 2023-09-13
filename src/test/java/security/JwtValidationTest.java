package security;

import echoboard.echoboard.security.JwtValidation;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.oidc.authentication.OidcIdTokenValidator;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.core.oidc.IdTokenClaimNames;
import org.springframework.security.oauth2.jwt.BadJwtException;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtValidationException;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class JwtValidationTest {


    JwtValidation validation;

    ClientRegistration clientRegistration = ClientRegistration.withRegistrationId("google")
            .clientId("1234567890")
            .clientSecret("secret")
            .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
            .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
            .redirectUri("{baseUrl}/login/oauth2/code/{registrationId}")
            .scope("openid", "profile", "email")
            .authorizationUri("https://accounts.google.com/o/oauth2/v2/auth")
            .tokenUri("https://www.googleapis.com/oauth2/v4/token")
            .jwkSetUri("https://www.googleapis.com/oauth2/v3/certs")
            .userInfoUri("https://www.googleapis.com/oauth2/v3/userinfo")
            .userNameAttributeName(IdTokenClaimNames.SUB)
            .clientName("Google")
            .build();

    JwtDecoder jwtDecoder = NimbusJwtDecoder.withJwkSetUri("https://www.googleapis.com/oauth2/v3/certs")
            .build();

    @Test
    void testValidToken() throws JwtValidationException {

        String tokenValue = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImEzYmRiZmRlZGUzYmFiYjI2NTFhZmNhMjY3OGRkZThjMGIzNWRmNzYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI5NjAyMzczMDQzMDktM2o2MXV1NG9mZmk1dm0ycW9ybXAyOWc3ZTg1MHQ3dDUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI5NjAyMzczMDQzMDktM2o2MXV1NG9mZmk1dm0ycW9ybXAyOWc3ZTg1MHQ3dDUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTgwODA2MDEwMDI2OTIyOTIxNDUiLCJoZCI6ImFwcGxpZWR0ZWNobm9sb2d5LnNlIiwiZW1haWwiOiJpYnJhaGltLmlxYmFsQGFwcGxpZWR0ZWNobm9sb2d5LnNlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJ2YTVxX1F6SlJUYnIzdk1FaUhmbHpRIiwibm9uY2UiOiJVX3VuQ1RVak14dHZwcFVDSG40cG10MjFQVHdybE04WUlSQ0JNMjduX0JVIiwibmFtZSI6IklicmFoaW0gSXFiYWwiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0ZUt2b3VDRlpud0lLMHNsbnFrWTMteG5kVDJnN1BqLWhqWlgzaEJzZ3lsPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IklicmFoaW0iLCJmYW1pbHlfbmFtZSI6IklxYmFsIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2ODk3OTg0MzIsImV4cCI6MTY4OTgwMjAzMn0.TZKtlzHRuI2n5kpRMzSKMr4ZLrxY1mi5XmAUfYrvvma7AhFBv0vZzw0FZxOPNVvb3RlAplU4ADDRY_rfevXuWRwNrUWNOIQ3NlsL4Y8l_riIQ2K3jH_cwaQ5efBbs_1utTe9ACIFpYHg_q08Fguq1FhNnkfhyt1fEiHcPWkkQxiuzp6gFx31kxp9jDYu_ZlsBzDGd12Hn1oB8d4V5H2QRXARBk6r6p6JBhdTlJLJftUktuaBIO-_r1QlGeVtpPdsvAxVLIDmHWEIdjQ-7DKdfnut7OE5o3pAYqXkgt-fnsIsUQ4jwQSDPH8HTA6lY8hCBd2mN50icV0HDuhn_wGH4w";

        OidcIdTokenValidator validator = new OidcIdTokenValidator(clientRegistration);
        assertThrows(JwtValidationException.class, () -> {
            validator.validate(jwtDecoder.decode(tokenValue));
        });
    }

    @Test
    void testInvalidToken() {

        String tokenValue = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImEzYmRiZmRlZGUzYmFiYjI2NTFhZmNhMjY3OGRkZThjMGIzNWRmNzYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI5NjAyMzczMDQzMDktM2o2MXV1NG9mZmk1dm0ycW9ybXAyOWc3ZTg1MHQ3dDUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI5NjAyMzczMDQzMDktM2o2MXV1NG9mZmk1dm0ycW9ybXAyOWc3ZTg1MHQ3dDUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTgwODA2MDEwMDI2OTIyOTIxNDUiLCJoZCI6ImFwcGxpZWR0ZWNobm9sb2d5LnNlIiwiZW1haWwiOiJpYnJhaGltLmlxYmFsQGFwcGxpZWR0ZWNobm9sb2d5LnNlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJ2YTVxX1F6SlJUYnIzdk1FaUhmbHpRIiwibm9uY2UiOiJVX3VuQ1RVak14dHZwcFVDSG40cG10MjFQVHdybE04WUlSQ0JNMjduX0JVIiwibmFtZSI6IklicmFoaW0gSXFiYWwiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0ZUt2b3VDRlpud0lLMHNsbnFrWTMteG5kVDJnN1BqLWhqWlgzaEJzZ3lsPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IklicmFoaW0iLCJmYW1pbHlfbmFtZSI6IklxYmFsIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2ODk3OTg0MzIsImV4cCI6MTY4OTgwMjAzMnr.TZKtlzHRuI2n5kpRMzSKMr4ZLrxY1mi5XmAUfYrvvma7AhFBv0vZzw0FZxOPNVvb3RlAplU4ADDRY_rfevXuWRwNrUWNOIQ3NlsL4Y8l_riIQ2K3jH_cwaQ5efBbs_1utTe9ACIFpYHg_q08Fguq1FhNnkfhyt1fEiHcPWkkQxiuzp6gFx31kxp9jDYu_ZlsBzDGd12Hn1oB8d4V5H2QRXARBk6r6p6JBhdTlJLJftUktuaBIO-_r1QlGeVtpPdsvAxVLIDmHWEIdjQ-7DKdfnut7OE5o3pAYqXkgt-fnsIsUQ4jwQSDPH8HTA6lY8hCBd2mN50icV0HDuhn_wGH4w";

        OidcIdTokenValidator validator = new OidcIdTokenValidator(clientRegistration);
        assertThrows(BadJwtException.class, () -> {
            validator.validate(jwtDecoder.decode(tokenValue));
        });
    }
}
