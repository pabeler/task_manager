package pl.task_manager.springbackend.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.task_manager.springbackend.filter.RequestCounterFilter;

@Configuration
public class WebConfig {
    @Bean
    public FilterRegistrationBean<RequestCounterFilter> loggingFilter() {
        FilterRegistrationBean<RequestCounterFilter> registrationBean
                = new FilterRegistrationBean<>();
        registrationBean.setFilter(new RequestCounterFilter());
        registrationBean.addUrlPatterns("/*");
        return registrationBean;
    }
}

