-- Table: countries
CREATE TABLE countries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
);

-- Table: checklist_items
CREATE TABLE checklist_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    country_id INT,
    item_name VARCHAR(255),
    template_url VARCHAR(255),
    FOREIGN KEY (country_id) REFERENCES countries(id)
);

-- Table: uploads
CREATE TABLE uploads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    checklist_item_id INT,
    uploaded_by VARCHAR(100),
    file_path VARCHAR(255),
    status ENUM('Pending', 'Completed') DEFAULT 'Pending',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (checklist_item_id) REFERENCES checklist_items(id)
);

-- EMPLOYEE MANAGEMENT


CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    position VARCHAR(100),
    department VARCHAR(100),
    date_joined DATE,
    contract_type VARCHAR(50),
    profile_picture VARCHAR(255),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE performance_reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    review_period VARCHAR(50),
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comments TEXT,
    reviewed_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);


CREATE TABLE leave_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    leave_type VARCHAR(50),
    start_date DATE,
    end_date DATE,
    reason TEXT,
    status ENUM('pending', 'approved', 'denied') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);


-- TIME & ATTENDANCE


CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    date DATE,
    clock_in TIME,
    clock_out TIME,
    status ENUM('present', 'absent', 'late') DEFAULT 'present',
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);


CREATE TABLE schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    shift_start TIME,
    shift_end TIME,
    date DATE,
    alert_sent BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);


-- PROFESSIONAL DEVELOPMENT


CREATE TABLE development_plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    goal TEXT,
    progress TEXT,
    mentor VARCHAR(100),
    status ENUM('in-progress', 'completed') DEFAULT 'in-progress',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);


-- TEMPLATES


CREATE TABLE templates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    category VARCHAR(100),
    file_path VARCHAR(255),
    uploaded_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- DOCUMENT MANAGEMENT


CREATE TABLE documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    country VARCHAR(100),
    checklist TEXT,
    file_path VARCHAR(255),
    last_updated_by VARCHAR(100),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE employee_performance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    kpi VARCHAR(255),
    rating INT,
    notes TEXT,
    reviewed_on DATE,
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);
CREATE TABLE employee_leaves (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT NOT NULL,
  leave_type VARCHAR(50) NOT NULL,
  from_date DATE NOT NULL,
  to_date DATE NOT NULL,
  reason TEXT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES employees(id)
);
