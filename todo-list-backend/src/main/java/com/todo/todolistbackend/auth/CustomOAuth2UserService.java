package com.todo.todolistbackend.auth;


import com.todo.todolistbackend.entity.AuthProvider;
import com.todo.todolistbackend.entity.User;
import com.todo.todolistbackend.exception.OAuth2AuthenticationProcessingException;
import com.todo.todolistbackend.repository.UserRepository;
import io.micrometer.common.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    private final UserRepository userRepository;


    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        System.out.println(oAuth2UserRequest);
        System.out.println(oAuth2UserRequest.getAccessToken());
        System.out.println(oAuth2UserRequest.getClientRegistration());

        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);
        System.out.println(oAuth2User);
        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (Exception ex) {
            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }
    private String getEmail(OAuth2UserInfo oAuth2UserInfo){
        return (String) (StringUtils.isNotEmpty((String) oAuth2UserInfo.getAttributes().get(("email"))) ?
                        oAuth2UserInfo.getAttributes().get(("email")) :
                        oAuth2UserInfo.getAttributes().get(("id")));
    }
    private boolean checkInfo(OAuth2UserInfo oAuth2UserInfo){
        String email = getEmail(oAuth2UserInfo);

        return !StringUtils.isNotEmpty(email);
    }
    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) throws OAuth2AuthenticationProcessingException {
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());
        System.out.println(oAuth2UserInfo);
        System.out.println(getEmail(oAuth2UserInfo));
        System.out.println(checkInfo(oAuth2UserInfo));
        if(checkInfo(oAuth2UserInfo)) {
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }

        Optional<User> userOptional = userRepository.findByEmail(getEmail(oAuth2UserInfo));
        System.out.println(userOptional);
        User user = null;
        if(userOptional.isPresent()) {
            user = userOptional.get();
            System.out.println(oAuth2UserRequest.getClientRegistration().getRegistrationId());
            if(!user.getProvider().equals(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()))) {
                throw new OAuth2AuthenticationProcessingException("Looks like you're signed up with " +
                        user.getProvider() + " account. Please use your " + user.getProvider() +
                        " account to login.");
            }
            user = updateExistingUser(user, oAuth2UserInfo);
        } else {
            user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        }

        return UserPrincipal.create(user, oAuth2User.getAttributes());
    }

    private User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
        User user = new User();
        String provider = oAuth2UserRequest.getClientRegistration().getRegistrationId();
        System.out.println(oAuth2UserRequest.getClientRegistration().getRegistrationId());
        user.setProvider(AuthProvider.valueOf(provider));
        user.setProviderId(oAuth2UserInfo.getId());
        user.setName((String) oAuth2UserInfo.getAttributes().get("name"));
        user.setEmail((getEmail(oAuth2UserInfo)));
        user.setEnabled(true);
        user.setImageUrl(getPicture(provider,oAuth2UserInfo));
        user.setRole("OAUTH2_USER");
        System.out.println(user);
        return userRepository.save(user);
    }

    private String getPicture(String provider, OAuth2UserInfo auth2UserInfo) {
        switch (provider) {
            case "google":
                return (String) auth2UserInfo.getAttributes().get("picture");
            case "facebook":
                Map<String, Object> picture = (Map<String, Object>) auth2UserInfo.getAttributes().get("picture");
                return (String) ((Map<String, Object>) picture.get("data")).get("url");
            default:
                return null;
        }
    }
    private User updateExistingUser(User existingUser, OAuth2UserInfo oAuth2UserInfo) {
        existingUser.setName(oAuth2UserInfo.getName());
        existingUser.setImageUrl(oAuth2UserInfo.getImageUrl());
        return userRepository.save(existingUser);
    }

}
