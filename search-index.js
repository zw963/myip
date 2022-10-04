crystal_doc_search_index_callback({"repository_name":"myip","body":"# myip\n\n返回本机的公网 IP 以及访问外网的公网 IP，使用 http:/www.ip111.cn 以及 http://www.ip138.com 提供的服务。\n\n```sh\n ╰─ $ bin/myip \nip111.cn：从国内测试：123.123.123.123 中国 北京市\nip138.com：您的iP地址是：[123.123.123.123 ] 来自：中国北京市西城区 联通\nip111.cn：从国外测试：111.111.111.111 美国 洛杉矶\nip111.cn：从谷歌测试：111.111.111.111 美国 洛杉矶\n```\n\n## Contributing\n\n1. Fork it (<https://github.com/zw963/myip/fork>)\n2. Create your feature branch (`git checkout -b my-new-feature`)\n3. Commit your changes (`git commit -am 'Add some feature'`)\n4. Push to the branch (`git push origin my-new-feature`)\n5. Create a new Pull Request\n\n## Contributors\n\n- [Billy.Zheng](https://github.com/zw963) - creator and maintainer\n","program":{"html_id":"myip/toplevel","path":"toplevel.html","kind":"module","full_name":"Top Level Namespace","name":"Top Level Namespace","abstract":false,"locations":[],"repository_name":"myip","program":true,"enum":false,"alias":false,"const":false,"class_methods":[{"html_id":"get_ip_from_ip111(chan)-class-method","name":"get_ip_from_ip111","abstract":false,"args":[{"name":"chan","external_name":"chan","restriction":""}],"args_string":"(chan)","args_html":"(chan)","location":{"filename":"src/myip.cr","line_number":20,"url":"https://github.com/zw963/myip/blob/58c27d6989629207df6d89b667075306b41cd4de/src/myip.cr#L20"},"def":{"name":"get_ip_from_ip111","args":[{"name":"chan","external_name":"chan","restriction":""}],"visibility":"Public","body":"begin\n  doc = Crystagiri::HTML.from_url(\"http://www.ip111.cn\")\n  iframe = doc.where_tag(\"iframe\") do |tag|\n    spawn do\n      begin\n        url = tag.node.attributes[\"src\"].content\n        ip = ((Crystagiri::HTML.from_url(url)).at_css(\"body\")).not_nil!.content\n        title = (tag.node.parent.try(&.parent).try(&.parent).not_nil!.xpath_node(\"div[@class='card-header']\")).not_nil!.content.strip\n        chan.send({\"ip111.cn：#{title}：\", ip})\n      rescue OpenSSL::SSL::Error\n        STDERR.puts(\"visit #{url} failed\")\n        exit\n      end\n    end\n  end\n  {doc, iframe.size}\nrescue Socket::Error | OpenSSL::SSL::Error\n  STDERR.puts(\"visit http://getip.pub failed, please check internet connection.\")\n  exit\nend"}},{"html_id":"get_ip_from_ip138(chan)-class-method","name":"get_ip_from_ip138","abstract":false,"args":[{"name":"chan","external_name":"chan","restriction":""}],"args_string":"(chan)","args_html":"(chan)","location":{"filename":"src/myip.cr","line_number":7,"url":"https://github.com/zw963/myip/blob/58c27d6989629207df6d89b667075306b41cd4de/src/myip.cr#L7"},"def":{"name":"get_ip_from_ip138","args":[{"name":"chan","external_name":"chan","restriction":""}],"visibility":"Public","body":"spawn do\n  begin\n    doc = Crystagiri::HTML.from_url(\"http://www.ip138.com\", follow: true)\n    ip138_url = (doc.at_css(\"iframe\")).not_nil!.node.attributes[\"src\"].content\n    doc = Crystagiri::HTML.from_url(\"http:#{ip138_url}\")\n    chan.send({\"ip138.com：\", (doc.at_css(\"body p\")).not_nil!.content.strip})\n  rescue Socket::Error | OpenSSL::SSL::Error\n    STDERR.puts(\"visit http://www.ip138.com failed, please check internet connection.\")\n    exit\n  end\nend"}},{"html_id":"output(chan,size)-class-method","name":"output","abstract":false,"args":[{"name":"chan","external_name":"chan","restriction":""},{"name":"size","external_name":"size","restriction":""}],"args_string":"(chan, size)","args_html":"(chan, size)","location":{"filename":"src/myip.cr","line_number":44,"url":"https://github.com/zw963/myip/blob/58c27d6989629207df6d89b667075306b41cd4de/src/myip.cr#L44"},"def":{"name":"output","args":[{"name":"chan","external_name":"chan","restriction":""},{"name":"size","external_name":"size","restriction":""}],"visibility":"Public","body":""}}],"types":[{"html_id":"myip/Myip","path":"Myip.html","kind":"module","full_name":"Myip","name":"Myip","abstract":false,"locations":[{"filename":"src/myip/version.cr","line_number":1,"url":"https://github.com/zw963/myip/blob/58c27d6989629207df6d89b667075306b41cd4de/src/myip/version.cr#L1"}],"repository_name":"myip","program":false,"enum":false,"alias":false,"const":false,"constants":[{"id":"VERSION","name":"VERSION","value":"{{ (`shards version \\\"/home/runner/work/myip/myip/src/myip\\\"`).chomp.stringify }}"}]}]}})