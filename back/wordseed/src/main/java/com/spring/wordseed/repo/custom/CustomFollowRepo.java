package com.spring.wordseed.repo.custom;

public interface CustomFollowRepo {
    void deleteFollowBy(long srcUserId, long dstUserId) throws Exception;
}
