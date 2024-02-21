package com.spring.wordseed.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPostLiked is a Querydsl query type for PostLiked
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPostLiked extends EntityPathBase<PostLiked> {

    private static final long serialVersionUID = -608221759L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPostLiked postLiked = new QPostLiked("postLiked");

    public final QPost post;

    public final NumberPath<Long> postLikedId = createNumber("postLikedId", Long.class);

    public final QUser user;

    public QPostLiked(String variable) {
        this(PostLiked.class, forVariable(variable), INITS);
    }

    public QPostLiked(Path<? extends PostLiked> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPostLiked(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPostLiked(PathMetadata metadata, PathInits inits) {
        this(PostLiked.class, metadata, inits);
    }

    public QPostLiked(Class<? extends PostLiked> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.post = inits.isInitialized("post") ? new QPost(forProperty("post"), inits.get("post")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

