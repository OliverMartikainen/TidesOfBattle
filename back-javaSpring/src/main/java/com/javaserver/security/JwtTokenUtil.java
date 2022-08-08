package com.javaserver.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenUtil {

    @Value("${jwt-secret:kjhserlgkjhdfkljghlsdkjfghlkdsjfgh}")
    private String secret;
    
    
    //private Algorithm secretAlgo = Algorithm.HMAC256(this.secret);
    private static final String ISSUER = "PERSONAL APPLICATION";

    public String generateToken(String username) throws IllegalArgumentException, JWTCreationException {
        return JWT.create()
                .withSubject("User Details")
                .withClaim("username", username)
                .withClaim("creationTime", System.currentTimeMillis())
                .withIssuedAt(new Date())
                .withIssuer(ISSUER)
                .sign(Algorithm.HMAC256(this.secret));
    }

    public String validateTokenAndRetrieveSubject(String token)throws JWTVerificationException {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(this.secret))
                .withSubject("User Details")
                .withIssuer(ISSUER)
                .build();
        DecodedJWT jwt = verifier.verify(token);
        return jwt.getClaim("username").asString();
    }

}