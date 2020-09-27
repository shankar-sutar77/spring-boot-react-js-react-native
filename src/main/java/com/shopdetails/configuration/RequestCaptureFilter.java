package com.shopdetails.configuration;


import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.Date;

@Configuration
@Order(Ordered.HIGHEST_PRECEDENCE)
public class RequestCaptureFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        System.out.println("########## Initiating filter ##########");
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        CustomRequestWrapper request = new CustomRequestWrapper((HttpServletRequest) servletRequest);
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        String tenant = request.getHeader("tenant");
//        TenantContext.setCurrentTenant(tenant);

        String email = request.getHeader("email");

        String method = request.getMethod();
        String logString = "REQUEST "+ method +": " + request.getRequestURI() + ", EMAIL: " + email + ", TENANT: " + tenant + ", DATE: " + new Date();
        System.out.println(logString);
        String contentType = request.getContentType();
        //Skipping logging multipart details
        if(contentType != null && !contentType.contains("multipart/form-data;")) {
            if (method.equalsIgnoreCase("post")) {
                BufferedReader bf = request.getReader();
                String line;
                StringBuilder body = new StringBuilder();
                while ((line = bf.readLine()) != null) {
                    body.append(line);
                }
                System.out.println("REQUEST BODY: " + body);
            } else {
                String queryString = request.getQueryString();
                if (queryString != null)
                    System.out.println("REQUEST BODY: " + request.getQueryString());
            }
        }

//        AuditContext.setAuditMode(true);

        //call next filter in the filter chain
        try {

//            CustomResponseWrapper customResponseWrapper = new CustomResponseWrapper(response);

            filterChain.doFilter(request, response);

//            if (response.getContentType() != null) {
//
//                String body = customResponseWrapper.getCaptureAsString();
//                System.out.println("responseBody = " + (body));
//                JSONObject params = new JSONObject();
//                params.put("result", body);
//                response.setContentLength(Integer.MAX_VALUE);
//                response.getWriter().write(params.toString());
//            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void destroy() {

    }
}
