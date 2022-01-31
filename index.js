var puppeteer = require("puppeteer");
var fs = require("fs");

(async () => {
	const browser = await puppeteer.launch({
		executablePath:
			"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
	});
	const page = await browser.newPage();
	await page.goto("https://howrare.is/drops");
	await page.setDefaultNavigationTimeout(0);
	console.log("Browser is opened");
	var all_in_one = await page.$$eval(
		".all_collections .all_coll_row:not(.legend)",
		(elements) => {
			var current_time_date = 0;
			var all_twitter_links = [];
			let preoutput_text = [];
			for (var one_of_row = 0; one_of_row < elements.length; one_of_row++) {
				if (
					document
						.querySelectorAll(".all_collections .all_coll_row:not(.legend)")
						[one_of_row].classList.contains("drop_date")
				) {
					preoutput_text.push(
						"Date: " +
							document.querySelectorAll(
								".all_collections .all_coll_row:not(.legend)"
							)[one_of_row].innerText
					);
					current_time_date++;
				} else {
					for (
						var one_of_column_of_row = 0;
						one_of_column_of_row < elements[one_of_row].children.length;
						one_of_column_of_row++
					) {
						if (current_time_date >= 3) {
							switch (one_of_column_of_row) {
								case 0:
									preoutput_text.push(
										"Name: " +
											elements[one_of_row].children[one_of_column_of_row]
												.innerText
									);
									break;
								case 1:
									var list_of_lins = [];
									for (
										var one_of_link = 0;
										one_of_link <
										elements[one_of_row].children[one_of_column_of_row].children
											.length;
										one_of_link++
									) {
										list_of_lins.push(
											elements[one_of_row].children[one_of_column_of_row]
												.children[one_of_link].href
										);
										if (
											elements[one_of_row].children[
												one_of_column_of_row
											].children[one_of_link].href.indexOf("twitter") != -1
										) {
											all_twitter_links.push(
												elements[one_of_row].children[one_of_column_of_row]
													.children[one_of_link].href
											);
										}
									}
									preoutput_text.push("Links: " + list_of_lins.join(" \n"));
									break;
								case 2:
									preoutput_text.push(
										"Time: " +
											elements[one_of_row].children[one_of_column_of_row]
												.innerText
									);
									break;
								case 3:
									preoutput_text.push(
										"Count: " +
											elements[one_of_row].children[one_of_column_of_row]
												.innerText
									);
									break;
								case 4:
									preoutput_text.push(
										"Price: " +
											elements[one_of_row].children[one_of_column_of_row]
												.innerText
									);
									break;
								case 5:
									preoutput_text.push(
										"Extra description: " +
											elements[one_of_row].children[one_of_column_of_row]
												.innerText +
											"\n"
									);
									break;
							}
						} else {
							switch (one_of_column_of_row) {
								case 0:
									preoutput_text.push(
										"Name: " +
											elements[one_of_row].children[one_of_column_of_row]
												.innerText
									);
									break;
								case 1:
									var list_of_lins = [];
									for (
										var one_of_link = 0;
										one_of_link <
										elements[one_of_row].children[one_of_column_of_row].children
											.length;
										one_of_link++
									) {
										list_of_lins.push(
											elements[one_of_row].children[one_of_column_of_row]
												.children[one_of_link].href
										);
										if (
											elements[one_of_row].children[
												one_of_column_of_row
											].children[one_of_link].href.indexOf("twitter") != -1
										) {
											all_twitter_links.push(
												elements[one_of_row].children[one_of_column_of_row]
													.children[one_of_link].href
											);
										}
									}
									preoutput_text.push("Links: " + list_of_lins.join(" \n"));
									break;
								case 2:
									preoutput_text.push(
										"Time: " +
											elements[one_of_row].children[one_of_column_of_row]
												.innerText
									);
									break;
								case 4:
									preoutput_text.push(
										"Count: " +
											elements[one_of_row].children[one_of_column_of_row]
												.innerText
									);
									break;
								case 5:
									preoutput_text.push(
										"Price: " +
											elements[one_of_row].children[one_of_column_of_row]
												.innerText
									);
									break;
								case 6:
									preoutput_text.push(
										"Extra description: " +
											elements[one_of_row].children[one_of_column_of_row]
												.innerText +
											"\n"
									);
									break;
							}
						}
					}
				}
			}
			var all_in_one = [];
			all_in_one.push(preoutput_text);
			all_in_one.push(all_twitter_links);
			return all_in_one;
		}
	);
	console.log("Information collected");
	var output_text = all_in_one[0];
	var all_twitter_links = all_in_one[1];
	var text_editing = [];
	console.log("Number of followers - " + all_twitter_links.length);
	for (
		var one_of_followers = 0;
		one_of_followers < all_twitter_links.length;
		one_of_followers++
	) {
		await page.goto(all_twitter_links[one_of_followers]);
		await page.setDefaultNavigationTimeout(0);
		try {
			await page.waitForSelector(
				".css-4rbku5.css-18t94o4.css-901oao.r-18jsvk2.r-1loqt21.r-37j5jr.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-qvutc0 .css-901oao.css-16my406.r-18jsvk2.r-poiln3.r-b88u0q.r-bcqeeo.r-qvutc0 .css-901oao.css-16my406.r-poiln3.r-bcqeeo.r-qvutc0"
			);
		} catch (error) {}
		var all_twitter_followers = await page.$$eval("document", (elements) => {
			var elem = document.querySelectorAll(
				".css-4rbku5.css-18t94o4.css-901oao.r-18jsvk2.r-1loqt21.r-37j5jr.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-qvutc0 .css-901oao.css-16my406.r-18jsvk2.r-poiln3.r-b88u0q.r-bcqeeo.r-qvutc0 .css-901oao.css-16my406.r-poiln3.r-bcqeeo.r-qvutc0"
			);
			var never;
			if (elem.length > 0) {
				never = "Followers: " + elem[1].innerText.replaceAll(" ", "");
			} else {
				never = "Account is undefined";
			}

			return never;
		});
		text_editing.push(all_twitter_followers);
		console.log(
			"Collected " +
				one_of_followers +
				"/" +
				all_twitter_links.length +
				" followers"
		);
	}
	console.log("All followers collected");
	var count_of_followers = 0;
	for (
		var find_a_count_element = 0;
		find_a_count_element < output_text.length;
		find_a_count_element++
	) {
		console.log(find_a_count_element);
		if (output_text[find_a_count_element].includes("Count: ")) {
			await output_text.splice(
				find_a_count_element + 1,
				0,
				text_editing[count_of_followers]
			);
			await count_of_followers++;
			console.log("Count element found");
		}
	}
	console.log("Text edited");
	if (!fs.existsSync("Output_text.txt")) {
		fs.open("Output_text.txt", "w", (err) => {
			if (err) throw err;
			console.log("File created");
		});
	}

	fs.writeFile("Output_text.txt", output_text.join("\r\n"), (err) => {
		if (err) throw err;
		console.log("Information has been added!");
	});
	await browser.close();
})();
