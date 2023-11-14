CREATE DATABASE codefit_db;

CREATE TABLE training_day_tbl (
    training_day_id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exercise_library_tbl (
    exercise_lib_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    muscle_group VARCHAR(255)  -- Consider ENUM type if applicable
);

CREATE TABLE exercise_tbl (
    exercise_id SERIAL PRIMARY KEY,
    training_day_id INT NOT NULL,
    exercise_lib_id INT NOT NULL,
    exercise_order INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (training_day_id) REFERENCES training_day_tbl(training_day_id),
    FOREIGN KEY (exercise_lib_id) REFERENCES exercise_library_tbl(exercise_lib_id)
);

CREATE TABLE set_tbl (
    set_id SERIAL PRIMARY KEY,
    exercise_id INT NOT NULL,
    set_order INT NOT NULL, 
    reps INT,
    weight FLOAT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (exercise_id) REFERENCES exercise_tbl(exercise_id)
);
