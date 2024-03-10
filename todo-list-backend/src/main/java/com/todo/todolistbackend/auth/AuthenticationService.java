package com.todo.todolistbackend.auth;

import com.todo.todolistbackend.entity.AuthProvider;
import com.todo.todolistbackend.entity.Label;
import com.todo.todolistbackend.entity.Token;
import com.todo.todolistbackend.entity.User;
import com.todo.todolistbackend.exception.BadRequestException;
import com.todo.todolistbackend.repository.TokenRepository;
import com.todo.todolistbackend.repository.UserRepository;
import com.todo.todolistbackend.request.LoginRequest;
import com.todo.todolistbackend.request.SignUpRequest;
import com.todo.todolistbackend.request.TokenRequest;
import com.todo.todolistbackend.response.AuthenticationResponse;
import com.todo.todolistbackend.response.ErrorResponse;
import com.todo.todolistbackend.service.LabelService;
import com.todo.todolistbackend.service.ProjectService;
import com.todo.todolistbackend.service.TokenProvider;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenProvider tokenProvider;
    private final ProjectService projectService;
    private final LabelService labelService;
    private final CustomUserDetailsService customUserDetailsService;
    private final TokenRepository tokenRepository;
    public AuthenticationResponse signUp(SignUpRequest userRequest) {
        User user = User.builder()
                .email(userRequest.getEmail())
                .password(passwordEncoder.encode(userRequest.getPassword()))
                .imageUrl("")
                .role("USER")
                .isEnabled(true)
                .provider(AuthProvider.local)

                .build();
        userRepository.save(user);
        initialDetachUser(user);
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userRequest.getEmail(),userRequest.getPassword());
        authenticationManager.authenticate(token);
        UserPrincipal userPrincipal = (UserPrincipal) customUserDetailsService.loadUserByUsername(userRequest.getEmail());
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        String refreshToken = tokenProvider.generateRefreshToken(userPrincipal);
        String accessToken = tokenProvider.generateAccessToken(userPrincipal);
        authenticationResponse.setAccess_token(refreshToken);
        authenticationResponse.setRefresh_token(accessToken);
        saveToken(refreshToken,tokenProvider.getAppProperties().getAuth().getRefreshExpiration());
        return authenticationResponse;
    }
    private void saveToken(String re_token,long time){
        Token token = new Token(re_token,new Date(time),"Bearer");
        tokenRepository.save(token);
    }

    @Async
    private void initialDetachUser(User user){
        projectService.createInbox(user);
        projectService.createProject(user);
        labelService.createLabel(user);
    }
    public AuthenticationResponse login(LoginRequest loginRequest) {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),loginRequest.getPassword());
        authenticationManager.authenticate(token);
        UserPrincipal userPrincipal = (UserPrincipal) customUserDetailsService.loadUserByUsername(loginRequest.getEmail());
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();

        authenticationResponse.setAccess_token(tokenProvider.generateAccessToken(userPrincipal));
        authenticationResponse.setRefresh_token(tokenProvider.generateRefreshToken(userPrincipal));
        return authenticationResponse;

    }

    public Object refreshToken(TokenRequest tokenRequest) {
        Token token = tokenRepository.findByToken(tokenRequest.getRefresh_token()).orElseThrow(() -> new BadRequestException("Refresh token is not exist"));
        if(token.isActive()){
            return generateError();
        }
        String userEmail;
        try {

            userEmail = tokenProvider.extractUsername(tokenRequest.getRefresh_token());
        } catch (ExpiredJwtException ex) {
          generateError();
        }
        return null;
    }
    private ErrorResponse generateError(){
        ErrorResponse errorResponse = new ErrorResponse(new Date(),"Refresh token hết hạn!Please login", HttpStatus.UNAUTHORIZED.toString());
        return errorResponse;
    }
}
