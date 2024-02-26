package com.spring.wordseed.repo.custom;

public interface CustomFollowRepo {
    void deleteFollowByIds(long srcUserId, long dstUserId) throws Exception;
}
