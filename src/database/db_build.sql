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
  source VARCHAR NOT NULL DEFAULT 'local',
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
  channel_id INT NOT NULL REFERENCES videos(id) ON DELETE CASCADE ON UPDATE CASCADE,
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


COMMIT;
