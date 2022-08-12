package com.javaserver.security;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;


@Component
public class JwtFilter extends OncePerRequestFilter {

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String authHeader = request.getHeader("Authorization");

		if (authHeader == null || authHeader.isBlank() || (!authHeader.startsWith("Bearer ") && !authHeader.startsWith("bearer "))) {
			filterChain.doFilter(request, response);
			return;
		}

		String jwt = authHeader.substring(7);

		if (jwt == null || jwt.isBlank()) {
			filterChain.doFilter(request, response);
			return;
		}

		try {
			String username = jwtTokenUtil.validateTokenAndRetrieveSubject(jwt);

			// there is better way, but not the only purpose is to prevent requests without
			// token to most endpoints.
			UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, "",
					new ArrayList<>());
			SecurityContextHolder.getContext().setAuthentication(authentication);

			request.setAttribute("username", username);

		} catch (JWTVerificationException exc) {
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT Token");
			return;
		}

		filterChain.doFilter(request, response);
	}
}
