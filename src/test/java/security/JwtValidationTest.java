package security;

import echoboard.echoboard.security.JwtValidation;
import org.junit.jupiter.api.Test;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.jwt.BadJwtException;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtValidationException;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class JwtValidationTest {

    JwtValidation validation;

    JwtDecoder jwtDecoder = NimbusJwtDecoder.withJwkSetUri("https://www.googleapis.com/oauth2/v3/certs")
            .build();

    @Test
    void testValidToken() throws JwtValidationException {

        String tokenValue =
                """
                eyJhbGciOiJSUzI1NiIsImtpZCI6IjdjMGI2OTEzZmUxMzgyMGEzMzMzOTlhY2U0MjZlNzA1MzVhOWEwYmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2Njc5MjU2NzcxMTMtMGRwbmlxa2FoMnMwZXZndDdhaGJnMG92M3JtYTFsbTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2Njc5MjU2NzcxMTMtMGRwbmlxa2FoMnMwZXZndDdhaGJnMG92M3JtYTFsbTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTgwODA2MDEwMDI2OTIyOTIxNDUiLCJoZCI6ImFwcGxpZWR0ZWNobm9sb2d5LnNlIiwiZW1haWwiOiJpYnJhaGltLmlxYmFsQGFwcGxpZWR0ZWNobm9sb2d5LnNlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJmQlhOSUg3R252RnJ5NlBBc0g1b3FnIiwibm9uY2UiOiIzLTRSdWNlQzRCT0Z3Y01DdTRKb01yTlFqYUg1MWQyZjhTTmFweXE4b01VIiwibmFtZSI6IklicmFoaW0gSXFiYWwiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSzZmVzBJb2dWajRGcVpoYjRYQTE2TkZMVzVmdFY5VEl1NVpuclBkU3pSPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IklicmFoaW0iLCJmYW1pbHlfbmFtZSI6IklxYmFsIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2OTQ2MDg2NzUsImV4cCI6MTY5NDYxMjI3NX0.dmU0UCOhAkp-yCjIDak8wv-4ZYMwZUxirMEYdQWH0drL2F1i9VOWvPuH8BQZ7pbkBwgqBwRWeu96UhpcyqpfPabIRQKJB92QULruJsnkfGFmaX9RzT5bnofMGIsBbzWjW-rs7Cp8W5W7BJZ-94RSASDpJyqM_UZRFSfxCFnpMdKGlP0T5u7WKVorVoiJ120GA4MstbaFGh4wqJtdI5qGFsyf875Ov7jLdmB0IP1rbBlE2x66qBWrX8IQmtTnoTQBKRzYQqNyzePBUWjIoEkrQPXfn3wAk5pq82mqEHvnajfFnWzecT5kdZMe0rYn13HJPbedW_68ws-pKg0P1oTDMw                                        
                """;
        assertThrows(JwtValidationException.class, () -> {
            validation.validateJwt((OidcUser) jwtDecoder.decode(tokenValue));
        });
    }

    @Test
    void testInvalidToken() {

        String tokenValue = "eJhbGciOiJSUzI1NiIs1mtpZCI6ImEzYmRiZmRlZGUzYmFiYjI2NTFhZmNhMjY3OGRkZThjMGIzNWRmNzYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI5NjAyMzczMDQzMDktM2o2MXV1NG9mZmk1dm0ycW9ybXAyOWc3ZTg1MHQ3dDUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI5NjAyMzczMDQzMDktM2o2MXV1NG9mZmk1dm0ycW9ybXAyOWc3ZTg1MHQ3dDUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTgwODA2MDEwMDI2OTIyOTIxNDUiLCJoZCI6ImFwcGxpZWR0ZWNobm9sb2d5LnNlIiwiZW1haWwiOiJpYnJhaGltLmlxYmFsQGFwcGxpZWR0ZWNobm9sb2d5LnNlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJ2YTVxX1F6SlJUYnIzdk1FaUhmbHpRIiwibm9uY2UiOiJVX3VuQ1RVak14dHZwcFVDSG40cG10MjFQVHdybE04WUlSQ0JNMjduX0JVIiwibmFtZSI6IklicmFoaW0gSXFiYWwiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0ZUt2b3VDRlpud0lLMHNsbnFrWTMteG5kVDJnN1BqLWhqWlgzaEJzZ3lsPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IklicmFoaW0iLCJmYW1pbHlfbmFtZSI6IklxYmFsIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2ODk3OTg0MzIsImV4cCI6MTY4OTgwMjAzMnr.TZKtlzHRuI2n5kpRMzSKMr4ZLrxY1mi5XmAUfYrvvma7AhFBv0vZzw0FZxOPNVvb3RlAplU4ADDRY_rfevXuWRwNrUWNOIQ3NlsL4Y8l_riIQ2K3jH_cwaQ5efBbs_1utTe9ACIFpYHg_q08Fguq1FhNnkfhyt1fEiHcPWkkQxiuzp6gFx31kxp9jDYu_ZlsBzDGd12Hn1oB8d4V5H2QRXARBk6r6p6JBhdTlJLJftUktuaBIO-_r1QlGeVtpPdsvAxVLIDmHWEIdjQ-7DKdfnut7OE5o3pAYqXkgt-fnsIsUQ4jwQSDPH8HTA6lY8hCBd2mN50icV0HDuhn_wGH4w";

        assertThrows(BadJwtException.class, () -> {
            validation.validateJwt((OidcUser) jwtDecoder.decode(tokenValue));
        });
    }
}
