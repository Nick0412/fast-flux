DO 
$initial$
BEGIN
    CREATE SCHEMA IF NOT EXISTS ff AUTHORIZATION nick;

    CREATE TABLE IF NOT EXISTS ff.users (
        id              serial,
        first_name      varchar(50) NOT NULL,
        last_name       varchar(50),
        handle          varchar(15) NOT NULL,
        profile_picture bytea,
        loc             varchar(50) NOT NULL,
        birth_date      date NOT NULL,
        created_on      timestamptz NOT NULL,
        modified_on     timestamptz,
        password        varchar(80) NOT NULL,
        PRIMARY KEY (id),
        UNIQUE (handle)
    );

    CREATE TABLE IF NOT EXISTS ff.followers (
        id                  serial,
        follower            integer NOT NULL,
        following           integer NOT NULL,
        created_on    timestamptz NOT NULL,
        FOREIGN KEY (follower) REFERENCES ff.users (id),
        FOREIGN KEY (following) REFERENCES ff.users (id),
        PRIMARY KEY (id)
    );

    CREATE TABLE IF NOT EXISTS ff.posts (
        id              serial,
        user_id         integer NOT NULL,
        content         varchar(128),
        created_on      timestamptz NOT NULL,
        FOREIGN KEY (user_id) REFERENCES ff.users (id),
        PRIMARY KEY (id)
    );

    CREATE TABLE IF NOT EXISTS ff.comments (
        id                  serial,
        user_id             integer NOT NULL,
        post                integer NOT NULL,
        content             varchar(128),
        created_on          timestamptz NOT NULL,
        modified_on         timestamptz NOT NULL,
        FOREIGN KEY (user_id) REFERENCES ff.users (id),
        FOREIGN KEY (post) REFERENCES ff.posts (id),
        PRIMARY KEY (id)
    );
END
$initial$;
