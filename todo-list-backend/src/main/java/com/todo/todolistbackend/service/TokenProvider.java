package com.todo.todolistbackend.service;

import com.todo.todolistbackend.auth.UserPrincipal;
import com.todo.todolistbackend.config.AppProperties;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class TokenProvider {

    private static final Logger logger = LoggerFactory.getLogger(TokenProvider.class);

    private final AppProperties appProperties;

    public AppProperties getAppProperties() {
        return appProperties;
    }

    public String createToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + appProperties.getAuth().getTokenExpirationMsec());

        return  buildToken(new HashMap<>(),userPrincipal,expiryDate.getTime());

    }
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(appProperties.getAuth().getTokenSecret());
        return Keys.hmacShaKeyFor(keyBytes);
    }
    public String generateAccessToken(UserPrincipal userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(getSignInKey()).build().parseClaimsJws(token).getBody();
    }
    public String extractUsername(String token){
        return extractClaim(token,Claims::getSubject);
    }
    public Long getUserIdFromToken(String token) {


        return Long.parseLong(extractClaim(token, claims -> claims.get("id")).toString());
    }
    public String generateToken(
            Map<String, Object> extraClaims,
            UserPrincipal userDetails
    ) {
        return buildToken(extraClaims, userDetails, appProperties.getAuth().getAccessExpiration());
    }

    public String generateRefreshToken(
            UserPrincipal userDetails
    ) {
        return buildToken(new HashMap<>(), userDetails, appProperties.getAuth().getRefreshExpiration());
    }

    private String buildToken(
            Map<String, Object> extraClaims,
            UserPrincipal userDetails,
            long expiration
    ) {
        System.out.println(userDetails.getId());
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .claim("id", userDetails.getId().toString())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(appProperties.getAuth().getTokenSecret()).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException ex) {
            logger.error("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            logger.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            logger.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            logger.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            logger.error("JWT claims string is empty.");
        }
        return false;
    }
}
