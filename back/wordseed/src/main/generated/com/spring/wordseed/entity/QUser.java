package com.spring.wordseed.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = -361115529L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUser user = new QUser("user");

    public final QBaseTimeEntity _super = new QBaseTimeEntity(this);

    public final ListPath<BookMark, QBookMark> bookMarks = this.<BookMark, QBookMark>createList("bookMarks", BookMark.class, QBookMark.class, PathInits.DIRECT2);

    public final ListPath<Comment, QComment> comments = this.<Comment, QComment>createList("comments", Comment.class, QComment.class, PathInits.DIRECT2);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final StringPath deviceToken = createString("deviceToken");

    public final ListPath<Follow, QFollow> dstUsers = this.<Follow, QFollow>createList("dstUsers", Follow.class, QFollow.class, PathInits.DIRECT2);

    public final StringPath email = createString("email");

    public final ListPath<PostLiked, QPostLiked> postLikeds = this.<PostLiked, QPostLiked>createList("postLikeds", PostLiked.class, QPostLiked.class, PathInits.DIRECT2);

    public final ListPath<Post, QPost> posts = this.<Post, QPost>createList("posts", Post.class, QPost.class, PathInits.DIRECT2);

    public final StringPath refreshToken = createString("refreshToken");

    public final ListPath<Follow, QFollow> srcUsers = this.<Follow, QFollow>createList("srcUsers", Follow.class, QFollow.class, PathInits.DIRECT2);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final NumberPath<Long> userId = createNumber("userId", Long.class);

    public final QUserInfo userInfo;

    public final StringPath userName = createString("userName");

    public final EnumPath<com.spring.wordseed.enu.UserType> userType = createEnum("userType", com.spring.wordseed.enu.UserType.class);

    public QUser(String variable) {
        this(User.class, forVariable(variable), INITS);
    }

    public QUser(Path<? extends User> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUser(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUser(PathMetadata metadata, PathInits inits) {
        this(User.class, metadata, inits);
    }

    public QUser(Class<? extends User> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.userInfo = inits.isInitialized("userInfo") ? new QUserInfo(forProperty("userInfo"), inits.get("userInfo")) : null;
    }

}

