package se.salt.echoboard.service.repository;

import lombok.AllArgsConstructor;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Repository;
import se.salt.echoboard.model.EchoBoardUser;

import java.util.Optional;

@Repository
@AllArgsConstructor
public class EchoBoardUserRepository {

   private final JPAEchoBoardUserRepository userRepository;

   public EchoBoardUser createUser(OidcUser userToSave){

       EchoBoardUser user = EchoBoardUser.builder()
               .jwtId(userToSave.getSubject())
               .name(userToSave.getFullName())
               .email(userToSave.getEmail())
               .build();
       return userRepository.save(user);
   }

   public Optional<EchoBoardUser> getUserByJwtId(String userId){
       return userRepository.findByJwtId(userId);
   }
}
