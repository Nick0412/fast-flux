	DROP DATABASE IF EXISTS fast_flux;
	DROP USER IF EXISTS nick;

	CREATE USER nick WITH CREATEDB PASSWORD 'nick';
	CREATE DATABASE fast_flux WITH OWNER=nick;
