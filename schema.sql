CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS bis_departments (
    dept_code VARCHAR(10) PRIMARY KEY,
    dept_name VARCHAR(150) NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS standards_catalog (
    standard_id VARCHAR(50) PRIMARY KEY,
    is_number VARCHAR(30) NOT NULL,
    revision_year INT NOT NULL,
    title VARCHAR(300) NOT NULL,
    dept_code VARCHAR(10) REFERENCES bis_departments(dept_code),
    scope_summary TEXT
);

CREATE TABLE IF NOT EXISTS quality_control_orders (
    qco_id VARCHAR(50) PRIMARY KEY,
    qco_title VARCHAR(300) NOT NULL,
    notifying_ministry VARCHAR(200) NOT NULL,
    s_o_number VARCHAR(100),
    notification_date DATE,
    effective_date DATE,
    standard_id VARCHAR(50) REFERENCES standards_catalog(standard_id)
);

CREATE TABLE IF NOT EXISTS standard_test_clauses (
    clause_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    standard_id VARCHAR(50) REFERENCES standards_catalog(standard_id) ON DELETE CASCADE,
    clause_number VARCHAR(50) NOT NULL,
    parameter_name VARCHAR(150) NOT NULL,
    unit_of_measurement VARCHAR(50),
    acceptable_limit VARCHAR(200) NOT NULL,
    permissible_limit_relaxation VARCHAR(200),
    test_method_standard VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS certification_schemes (
    scheme_code VARCHAR(20) PRIMARY KEY,
    scheme_name VARCHAR(150) NOT NULL,
    governing_regulation TEXT,
    mark_type VARCHAR(50),
    target_entities TEXT
);

CREATE TABLE IF NOT EXISTS testing_laboratories (
    lab_id VARCHAR(30) PRIMARY KEY,
    lab_name VARCHAR(200) NOT NULL,
    lab_type VARCHAR(30),
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    contact_email VARCHAR(150)
);