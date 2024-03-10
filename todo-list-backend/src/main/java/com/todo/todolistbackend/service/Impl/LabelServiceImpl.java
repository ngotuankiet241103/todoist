package com.todo.todolistbackend.service.Impl;

import com.todo.todolistbackend.auth.UserPrincipal;
import com.todo.todolistbackend.dto.LabelDTO;
import com.todo.todolistbackend.entity.Label;
import com.todo.todolistbackend.entity.Project;
import com.todo.todolistbackend.entity.User;
import com.todo.todolistbackend.mapping.LabelMapping;
import com.todo.todolistbackend.repository.LabelRepository;
import com.todo.todolistbackend.request.LabelRequest;
import com.todo.todolistbackend.service.LabelService;
import com.todo.todolistbackend.service.UserService;
import com.todo.todolistbackend.util.HandleStrings;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LabelServiceImpl implements LabelService {
    private final LabelRepository labelRepository;
    private final UserService userService;
    private final LabelMapping labelMapping;
    @Override
    public Object save(LabelRequest labelRequest) {
        long count = labelRepository.count();
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.findByid(userPrincipal.getId());
        Label label = Label.builder()
                .name(labelRequest.getName())
                .user(user)
                .build();
        labelRepository.save(label);
        label.setCode(HandleStrings.generateCode(labelRequest.getName(),label.getId()));
        return mappingSingle(labelRepository.save(label));
    }

    @Override
    public void createLabel(User user) {
        Label label = Label.builder()
                .name("read")
                .user(user)
                .build();
        labelRepository.save(label);
        label.setCode(HandleStrings.generateCode(label.getName(),label.getId()));
        labelRepository.save(label);
    }

    @Override
    public Label findByName(String labelName) {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        long userId = userPrincipal.getId();
        return labelRepository.findByNameAndUserId(labelName,userId).orElseThrow(() -> new RuntimeException("label is not found"));
    }

    @Override
    public Set<Label> findAllByCode(List<String> labelCodes) {
        Set<Label> labels = labelCodes.stream()
                .map(code -> labelRepository.findByCode(code)
                        .orElseThrow(() -> new RuntimeException("label is not exist"))).collect(Collectors.toSet());
        return labels;
    }

    @Override
    public Object findAll() {
        try {
            UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            long userId = userPrincipal.getId();
            List<Label> labels = labelRepository.findByUserId(userId);
            return mappingAll(labels);
        }
        catch (Exception exception){
            System.out.println(exception);
        }

        return null;
    }
    private List<LabelDTO> mappingAll(List<Label> labels){
        return labels.stream()
                .map(label -> mappingSingle(label)).collect(Collectors.toList());
    }
    private LabelDTO mappingSingle(Label label){
        return labelMapping.toDTO(label);
    }


}
