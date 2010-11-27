require 'rubygems'
require 'flickraw'

file_name = File.join(File.dirname(__FILE__), "..", "config", "flickr.yml")
flickr = YAML.load(File.new(file_name).read)

FlickRaw.api_key=flickr['api_key']
FlickRaw.shared_secret=flickr['shared_secret']

class PhotoFetcher
  def self.fetch
    id = flickr.people.findByUsername(:username => "mrjaba").id
    flickr.photos.search(:user_id => id, :tags => "portfolio").each do |p|
      info = flickr.photos.getInfo(:photo_id => p.id)
      if( photo_doesnt_exist?(info) ) 
        Photo.create(:title => info.title, :url => FlickRaw.url_o(info), :large => FlickRaw.url_b(info), 
                    :thumbnail => FlickRaw.url_s(info), :default => is_default?(info.tags))
      end
    end    
  end
  
  def self.photo_doesnt_exist?(info)
    !Photo.where(:url => FlickRaw.url_o(info)).present?
  end
  
  def self.is_default?(tags)
    tags.collect{|tag| tag["raw"] }.include?("default")
  end
  
end
