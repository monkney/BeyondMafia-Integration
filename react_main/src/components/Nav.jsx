import React, { useState, useEffect, useReducer } from "react";
import { NavLink } from "react-router-dom";

import Dropdown from "./Dropdown";
import { camelCase } from "../utils";

import "../css/nav.css"

export function Nav(props) {
	return (
		<div className="nav">
			{props.children}
		</div>
	);
}

export function SubNav(props) {
	const links = props.links.map((link, i) => {
		return (!link.hide &&
			<NavLink
				exact={link.exact}
				to={link.path}
				key={link.path}>
				{link.text}
			</NavLink>
		);
	});

	return (
		<div className="sub-nav">
			{links}
			{props.showFilter &&
				<div className="filter">
					<Dropdown
						value={props.filterSel}
						options={props.filterOptions}
						onChange={props.onFilter}
						icon={props.filterIcon}
						caret />
				</div>
			}
		</div>
	);
}

export function ButtonGroup(props) {
	const sel = camelCase(props.sel);
	const buttons = props.buttons.map((button, i) => {
		return (
			<div
				className={`btn ${sel == camelCase(button) ? "btn-sel" : ""}`}
				onClick={() => props.onClick(button)}
				key={i}>
				{button}
			</div>
		);
	});

	return (
		<div className="btn-group">
			{buttons}
		</div>
	);
}

export function PageNav(props) {
	const page = props.page;
	const maxPage = props.maxPage;
	const range = props.range || 5;
	const onNav = props.onNav;
	const noRange = maxPage == null;

	const [pages, updatePages] = useReducer(
		() => {
			if (noRange)
				return [page];

			var sel = page <= maxPage ? page : 1;
			var i = sel;
			var j = sel + 1;
			var list = [];
			var changed = true;

			while (changed) {
				changed = false;

				if (list.length < range && i >= 1) {
					list.unshift(i--);
					changed = true;
				}

				if (list.length < range && j <= maxPage) {
					list.push(j++);
					changed = true;
				}
			}

			return list;
		},
		maxPage,
		(pages) => {
			if (noRange)
				return [1];

			var list = [];

			for (let i = 0; i < pages; i++)
				list.push(i + 1);

			return list;
		}
	);

	useEffect(() => {
		updatePages();
	}, [page, range, maxPage]);

	function onClick(page) {
		if (page >= 1 && (noRange || page <= maxPage))
			onNav(page);
	}

	const pageNums = pages.map(page => {
		var className = "page-num";

		if (props.page == page)
			className += " page-sel";

		return (
			<div
				className={className}
				onClick={() => onClick(page)}
				key={page}>
				{page}
			</div>
		);
	});

	return (
		<div className="page-nav">
			<div
				className="page-nav-left max"
				onClick={() => onClick(1)}>
				«
			</div>
			<div
				className="page-nav-left"
				onClick={() => onClick(page - 1)}>
				‹
			</div>
			{pageNums}
			<div
				className={`page-nav-right ${noRange ? "max" : ""}`}
				onClick={() => onClick(page + 1)}>
				›
			</div>
			{!noRange &&
				<div
					className="page-nav-right max"
					onClick={() => onClick(maxPage)}>
					»
				</div>
			}
		</div>
	);
}

export function SearchBar(props) {
	function onInput(event) {
		props.onInput(event.target.value);
	}

	return (
		<div className="search-bar">
			<input
				type="text"
				value={props.value}
				placeholder={props.placeholder}
				onChange={onInput} />
			<div className="search-icon">
				<i className="fas fa-search" />
			</div>
		</div>
	);
}