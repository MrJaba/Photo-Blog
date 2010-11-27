class Photo
  include Mongoid::Document
  field :title
  field :url  
  field :thumbnail
  
  def self.default
    Photo.where(:default => true).first
  end
end