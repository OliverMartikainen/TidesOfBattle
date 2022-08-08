package com.javaserver.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;




//import com.javaserver.cache.UsersInterface;
//import com.javaserver.cache.UsersMongo;

@Component
public class JwtFilter extends OncePerRequestFilter {

	/*@Autowired
	private UsersInterface userDetailsService = new UsersMongo();
	*/@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String authHeader = request.getHeader("Authorization");

		if (authHeader != null && !authHeader.isBlank() && authHeader.startsWith("Bearer ")) {
			String jwt = authHeader.substring(7);

			if (jwt == null || jwt.isBlank()) {
				response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid JWT Token in Bearer Header");
			} else {
				try {
					String username = jwtTokenUtil.validateTokenAndRetrieveSubject(jwt);
					/*if (!userDetailsService.isUserValid(username)) {
						response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid JWT Token username");

					}*/
						request.setAttribute("username", username);
					

				} catch (JWTVerificationException exc) {
					response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid JWT Token");
				}
			}
		}

		filterChain.doFilter(request, response);
	}
}
