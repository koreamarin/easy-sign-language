package com.ssafy.easysign.model.request;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class RegistRequest  {
    @Id
    private Long id;
    private String email;
    private String password;
    private String name;
}
