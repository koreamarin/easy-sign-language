package com.ssafy.easysign.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.time.Duration;

@RequiredArgsConstructor
@Service
public class RedisUtil {
    private final StringRedisTemplate stringRedisTemplate;

    public String getData(String key){
        //key-value 형태의 자료구조
        ValueOperations<String,String> valueOperations = stringRedisTemplate.opsForValue();
        return valueOperations.get(key);
    }

    //데이터 설정
    public void setData(String key, String value){
        ValueOperations<String,String> valueOperations = stringRedisTemplate.opsForValue();
        valueOperations.set(key,value);
    }

    //만료 시간 데이터 설정
    public void setDataExpire(String key,String value,long duration){
        ValueOperations<String,String> valueOperations = stringRedisTemplate.opsForValue();
        Duration expireDuration = Duration.ofSeconds(duration);
        valueOperations.set(key,value,expireDuration);
    }

    public void deleteData(String key){
        stringRedisTemplate.delete(key);
    }
}
