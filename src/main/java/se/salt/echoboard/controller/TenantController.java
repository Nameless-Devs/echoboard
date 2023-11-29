package se.salt.echoboard.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.salt.echoboard.multitenancy.context.TenantContext;

@RestController
@RequestMapping("api/v1/tenant")
public class TenantController {

    @GetMapping
    String getTenant(){
        return TenantContext.getTenantId();
    }
}
