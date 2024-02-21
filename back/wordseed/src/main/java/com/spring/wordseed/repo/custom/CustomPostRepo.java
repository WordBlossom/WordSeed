package com.spring.wordseed.repo.custom;

import com.spring.wordseed.dto.out.ReadPostOutDTO;
import com.spring.wordseed.entity.Post;
import com.spring.wordseed.enu.PostSort;
import com.spring.wordseed.enu.PostType;

import java.util.List;

public interface CustomPostRepo {
    List<ReadPostOutDTO> FindByCustom(String postTypes, String mark, Long userId, PostSort sort, String query, Long page, Long size);
}
