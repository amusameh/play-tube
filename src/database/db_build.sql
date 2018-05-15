BEGIN;

DROP TABLE IF EXISTS users, videos, comments, subscribe, play_lists, video_play_lists, likes_dislikes, views CASCADE;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE NOT NULL,
  fname VARCHAR,
  lname VARCHAR,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL CHECK(CHAR_LENGTH(password)>=8),
  country VARCHAR,
  sex VARCHAR(1) NOT NULL CHECK(sex IN ('m', 'f')),
  role VARCHAR DEFAULT 'user',
  bio TEXT,
  facebook VARCHAR,
  twitter VARCHAR,
  cover VARCHAR,
  avatar VARCHAR,
  deleted BOOLEAN DEFAULT false
);

CREATE TABLE videos(
  id SERIAL PRIMARY KEY,
  hashed_id VARCHAR NOT NULL UNIQUE,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  title VARCHAR NOT NULL,
  description TEXT NOT NULL,
  link VARCHAR NOT NULL UNIQUE,
  poster_url VARCHAR,
  category VARCHAR CHECK(category IN ('Film & Animation', 'Cars & Vehicles', 'Music', 'Pets & Animals', 'Sports', 'Travel & Events', 'Gaming', 'Comedy', 'Entertainment', 'News & Politics', 'How-to & Style', 'Non-profits & Activism')),
  deleted BOOLEAN DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP,
  likes INT,
  dislikes INT,
  views INT
);

CREATE TABLE likes_dislikes(
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  video_id INT NOT NULL REFERENCES videos(id) ON DELETE CASCADE ON UPDATE CASCADE,
  like_state VARCHAR(1) NOT NULL,
  PRIMARY KEY (user_id, video_id)
);

CREATE TABLE views(
  user_id INT REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  video_id INT REFERENCES videos(id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (user_id, video_id)
);

CREATE TABLE subscribe(
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  channel_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  deleted BOOLEAN DEFAULT false,
  PRIMARY KEY (user_id, channel_id)
);

CREATE TABLE play_lists(
  id SERIAL PRIMARY KEY,
  hashed_id VARCHAR NOT NULL UNIQUE,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  name VARCHAR NOT NULL,
  description TEXT NOT NULL,
  deleted BOOLEAN DEFAULT false,
  private BOOLEAN DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE TABLE video_play_lists(
  id SERIAL PRIMARY KEY,
  video_id INT NOT NULL REFERENCES videos(id) ON DELETE CASCADE ON UPDATE CASCADE,
  play_list_id INT NOT NULL REFERENCES play_lists(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE comments(
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  video_id INT REFERENCES videos(id) ON DELETE CASCADE ON UPDATE CASCADE,
  content TEXT NOT NULL,
  deleted BOOLEAN DEFAULT false,
  parent_id INT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP
);

INSERT INTO  users (username, fname, lname, email, password, country, sex, bio, facebook, twitter, cover, avatar) VALUES
  ('ahmed_sh', 'Ahmed', 'Shatat', 'a.shatat@hotmail.com', '$2b$10$QSo.MiyP4yjS7fmdNGYBNOa.wwY3sSAZrvPpb6uUth5wJsM9K3b9O', 'USA', 'm', 'Something about myself', 'https://www.facebook.com/ahmed.shatat.986', 'https://twitter.com/ashatat2015', 'https://i.pinimg.com/originals/6a/07/f2/6a07f2cc3d7ba95b48ca02ae2199598a.jpg', 'https://cdn.vectorstock.com/i/1000x1000/25/70/user-icon-woman-profile-human-avatar-vector-10552570.jpg'),
  ('mohammed_h', 'Mohammed', 'Al-heila', 'm.heila@hotmail.com', '$2b$10$QSo.MiyP4yjS7fmdNGYBNOa.wwY3sSAZrvPpb6uUth5wJsM9K3b9O', 'Palestine', 'm', 'Something about himself', 'https://www.facebook.com/shatat.986', 'https://twitter.com/ashat2015', 'https://cdn.vectorstock.com/i/1000x1000/25/31/user-icon-businessman-profile-man-avatar-vector-10552531.jpg', 'https://cdn.vectorstock.com/i/1000x1000/25/70/user-icon-woman-profile-human-avatar-vector-10552570.jpg'),
  ('AbdSamad_m', 'Abd', 'Samad', 'a.samad@hotmail.com', '$2b$10$QSo.MiyP4yjS7fmdNGYBNOa.wwY3sSAZrvPpb6uUth5wJsM9K3b9O', 'Germany', 'f', 'Something about somepeople', 'https://www.facebook.com/shatat.986', 'https://twitter.com/ashatat5015', 'https://i.pinimg.com/originals/6a/07/f2/6a07f2cc3d7ba95b48ca02ae2199598a.jpg', 'https://cdn.vectorstock.com/i/1000x1000/25/70/user-icon-woman-profile-human-avatar-vector-10552570.jpg'),
  ('Abdallah_d', 'Abd', 'Dagga', 'a.dagga@hotmail.com', '$2b$10$QSo.MiyP4yjS7fmdNGYBNOa.wwY3sSAZrvPpb6uUth5wJsM9K3b9O', 'Turkey', 'f', 'Something about myself', 'https://www.facebook.com/abd.dagga.986', 'https://twitter.com/adagga2015', 'https://i.pinimg.com/originals/6a/07/f2/6a07f2cc3d7ba95b48ca02ae2199598a.jpg', 'https://cdn.vectorstock.com/i/1000x1000/25/70/user-icon-woman-profile-human-avatar-vector-10552570.jpg');


INSERT INTO videos (hashed_id, user_id, title, description, link, poster_url, category) VALUES
('dt7p0qj5is', 1, 'Hamza Namira - Sheekayyo | حمزة نمرة - شيكايو', 'شيكايو اغنية غبية ومش فاهم ايش مال ابوهاط ', 'https://www.youtube.com/watch?v=GoerU3f2xAM', 'https://i.ytimg.com/vi/GoerU3f2xAM/maxresdefault.jpg', 'Music'),
('lockl4gwns', 2, 'ICE GOD OF HUNGARY by Glitter Job [AUDIO ONLY]', 'Ice god of hunary awesome song by glitter job found it on badlips stranger thing video', 'https://www.youtube.com/watch?v=4mokhz53Dbo', 'https://i.ytimg.com/vi/4mokhz53Dbo/default.jpg', 'Music');


INSERT INTO play_lists (hashed_id, user_id, name, description) VALUES
('dt7p0qj5is', 1, 'stupid videos', 'some dummy videos'),
('lockl4gwns', 1, 'stupid videos', 'some dummy videos');

INSERT INTO video_play_lists (video_id, play_list_id) VALUES
(1, 1), (2, 1), (2, 2);

INSERT INTO comments (user_id, video_id, content, parent_id) VALUES
(1, 1, 'nice video', NULL),
(2, 1, 'not a nice video', NULL),
(2, 1, 'are you sure it is nice video?', 1),
(1, 1, 'yep i am sure it is a nice video', 3),
(3, 1, 'calm down guys', 4),
(4, 1, 'what a sweet video', 2);

INSERT INTO views (user_id, video_id) VALUES
(1,2), (2,1), (3,2), (4,2), (3,1), (4,1);

INSERT INTO subscribe (user_id, channel_id) VALUES
(1,2), (2,1), (3,1), (4,1), (1,3), (1,4), (3,2), (4,2);

INSERT INTO likes_dislikes (user_id, video_id, like_state) VALUES
(1,2,'l'), (2,1,'l'), (3,2,'d'), (4,2,'l'), (3,1,'l'), (4,1,'l');

COMMIT;
-- -------------------------------------------------------
-- select username ,content  from comments inner join users on user_id = users.id  where parent_id = 1 and video_id = 1;
-- username  |            content
-- ------------+--------------------------------
-- mohammed_h | are you sure it is nice video?
-- ----------------------------------------------------------
