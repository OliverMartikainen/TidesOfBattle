package com.javaserver.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import javax.servlet.Filter;
import javax.servlet.http.HttpServletResponse;
import com.javaserver.security.JwtFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

	@Autowired
	private JwtFilter filter;

	@Bean
	protected AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
			throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}
		
	@Bean
	protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // Enable CORS and disable CSRF
		http.cors().and().csrf().disable().httpBasic().disable();
		
		http
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

		http
        .exceptionHandling()
        .authenticationEntryPoint(
            (request, response, authException) -> {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage());
            }
        );

        http.antMatcher("/api/**")
        .authorizeHttpRequests()
        .antMatchers("/api/users/login").permitAll()
        .antMatchers("/api/users/usernames").permitAll()
        .antMatchers("/api/cards/sse").permitAll()
        .anyRequest().authenticated()
        .and()
        .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}
}